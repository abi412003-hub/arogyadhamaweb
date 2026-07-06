"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  PhoneOff,
  Mic,
  MicOff,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
// Type-only import — erased at build time; the SDK value is imported lazily on
// first use so no WebRTC/browser globals ever enter a server bundle.
import type { Conversation as ConversationType } from "@elevenlabs/client";

const LANGUAGES = [
  { code: "en", native: "English", english: "English" },
  { code: "hi", native: "हिन्दी", english: "Hindi" },
  { code: "kn", native: "ಕನ್ನಡ", english: "Kannada" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];
type Phase = "idle" | "picking" | "connecting" | "in-call" | "error";
type Mode = "speaking" | "listening";

export default function VoiceAssistant({ agentId }: { agentId: string }) {
  const isMobile = useIsMobile();
  const [phase, setPhase] = useState<Phase>("idle");
  const [mode, setMode] = useState<Mode>("listening");
  const [muted, setMuted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activeLang, setActiveLang] = useState<LangCode | null>(null);

  const convoRef = useRef<ConversationType | null>(null);
  const startingRef = useRef(false); // guards StrictMode double-invoke + double-clicks

  const pickerOpen = phase === "picking";
  const activeNative = LANGUAGES.find((l) => l.code === activeLang)?.native;

  const openPicker = () => {
    setErrorMsg(null);
    setPhase("picking");
  };

  const closePicker = () => {
    setPhase((p) => (p === "picking" ? "idle" : p));
  };

  const startCall = useCallback(
    async (lang: LangCode) => {
      if (startingRef.current) return;
      startingRef.current = true;
      setActiveLang(lang);
      setMuted(false);
      setMode("listening");
      setPhase("connecting");
      try {
        const { Conversation } = await import("@elevenlabs/client");
        const convo = await Conversation.startSession({
          agentId,
          connectionType: "webrtc",
          overrides: { agent: { language: lang } },
          onConnect: () => setPhase("in-call"),
          onDisconnect: () => {
            convoRef.current = null;
            setPhase("idle");
          },
          onError: (message: unknown) => {
            setErrorMsg(
              typeof message === "string" ? message : "Connection error",
            );
            setPhase("error");
          },
          onModeChange: ({ mode }: { mode: Mode }) => setMode(mode),
          onStatusChange: ({ status }: { status: string }) => {
            if (status === "connected") setPhase("in-call");
          },
        });
        convoRef.current = convo;
      } catch (err) {
        const e = err as { name?: string; message?: string };
        const denied =
          e?.name === "NotAllowedError" ||
          /permission|denied|notallowed/i.test(String(e?.message));
        setErrorMsg(
          denied
            ? "Microphone access is required. Please allow the mic and try again."
            : e?.message || "Could not start the call. Please try again.",
        );
        setPhase("error");
      } finally {
        startingRef.current = false;
      }
    },
    [agentId],
  );

  const endCall = useCallback(async () => {
    try {
      await convoRef.current?.endSession();
    } catch {
      /* ignore */
    } finally {
      convoRef.current = null;
      setPhase("idle");
    }
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((m) => {
      const next = !m;
      convoRef.current?.setMicMuted(next);
      return next;
    });
  }, []);

  // End any live session on unmount.
  useEffect(
    () => () => {
      void convoRef.current?.endSession().catch(() => {});
    },
    [],
  );

  const overlayVisible =
    phase === "connecting" || phase === "in-call" || phase === "error";

  const pickerBody = (
    <div className="grid gap-3">
      {LANGUAGES.map((l, i) => (
        <motion.button
          key={l.code}
          type="button"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 * i }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => startCall(l.code)}
          className="flex items-center justify-between rounded-xl px-5 py-4 text-left shadow-sm transition-colors"
          style={{
            background: "hsl(var(--cream))",
            border: "1px solid hsl(var(--gold-pale))",
          }}
        >
          <span
            className="font-display text-xl font-semibold"
            style={{ color: "hsl(var(--forest))" }}
          >
            {l.native}
          </span>
          <span
            className="font-body text-xs uppercase tracking-wide"
            style={{ color: "hsl(var(--sage))" }}
          >
            {l.english}
          </span>
        </motion.button>
      ))}
    </div>
  );

  return (
    <>
      {/* Floating launcher — only when idle/error (overlay takes the corner otherwise) */}
      <AnimatePresence>
        {(phase === "idle" || phase === "error") && !overlayVisible && (
          <motion.button
            type="button"
            initial={{ opacity: 0, scale: 0.6, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6, y: 10 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={openPicker}
            className="fixed bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2 rounded-full px-5 py-3 shadow-lg focus:outline-none focus:ring-4 focus:ring-[hsl(var(--gold)/0.4)]"
            style={{ background: "hsl(var(--forest))", color: "hsl(var(--cream))" }}
            aria-label="Talk to our voice assistant"
          >
            <Phone size={18} />
            <span className="font-body text-sm font-semibold">Need Help?</span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Language picker: Drawer (bottom sheet) on mobile, Dialog on desktop */}
      {isMobile ? (
        <Drawer open={pickerOpen} onOpenChange={(o) => !o && closePicker()}>
          <DrawerContent style={{ background: "hsl(var(--cream))" }}>
            <div className="px-5 pb-10 pt-2">
              <DrawerTitle
                className="font-display text-2xl"
                style={{ color: "hsl(var(--forest))" }}
              >
                Choose your language
              </DrawerTitle>
              <DrawerDescription className="mb-5 mt-1">
                Select a language to start talking with Prashanthi.
              </DrawerDescription>
              {pickerBody}
            </div>
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={pickerOpen} onOpenChange={(o) => !o && closePicker()}>
          <DialogContent
            className="max-w-sm border-0"
            style={{ background: "hsl(var(--cream))" }}
          >
            <DialogTitle
              className="font-display text-2xl"
              style={{ color: "hsl(var(--forest))" }}
            >
              Choose your language
            </DialogTitle>
            <DialogDescription className="mb-3">
              Select a language to start talking with Prashanthi.
            </DialogDescription>
            {pickerBody}
          </DialogContent>
        </Dialog>
      )}

      {/* Connecting / in-call / error overlay */}
      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-4 sm:right-6 z-[60] w-[300px] max-w-[calc(100vw-2rem)] rounded-2xl p-5 shadow-2xl"
            style={{
              background: "hsl(var(--forest-dark))",
              color: "hsl(var(--cream))",
            }}
            role="dialog"
            aria-label="Voice call"
          >
            {phase === "connecting" && (
              <div className="flex flex-col items-center gap-3 py-4 text-center">
                <Loader2 className="animate-spin" size={28} />
                <p className="font-body text-sm">
                  Connecting… allow microphone if asked
                </p>
              </div>
            )}

            {phase === "in-call" && (
              <>
                <div className="flex flex-col items-center gap-4 py-1">
                  <motion.div
                    animate={
                      mode === "speaking"
                        ? { scale: [1, 1.18, 1], opacity: [0.85, 1, 0.85] }
                        : { scale: 1, opacity: 0.75 }
                    }
                    transition={{
                      duration: 1.1,
                      repeat: mode === "speaking" ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                    className="h-16 w-16 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, hsl(var(--gold-light)), hsl(var(--gold)))",
                      boxShadow: "0 0 24px hsl(var(--gold) / 0.5)",
                    }}
                  />
                  <p className="font-body text-xs opacity-80">
                    {mode === "speaking"
                      ? "Prashanthi is speaking…"
                      : "Listening…"}
                    {activeNative ? ` · ${activeNative}` : ""}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={muted ? "Unmute microphone" : "Mute microphone"}
                    className="rounded-full p-3 transition-transform hover:scale-105"
                    style={{ background: "hsl(var(--forest-light))" }}
                  >
                    {muted ? <MicOff size={18} /> : <Mic size={18} />}
                  </button>
                  <button
                    type="button"
                    onClick={endCall}
                    aria-label="End call"
                    className="rounded-full p-3 transition-transform hover:scale-105"
                    style={{ background: "#dc2626" }}
                  >
                    <PhoneOff size={18} />
                  </button>
                </div>
              </>
            )}

            {phase === "error" && (
              <div className="flex flex-col items-center gap-3 py-1 text-center">
                <AlertTriangle
                  size={26}
                  style={{ color: "hsl(var(--gold-light))" }}
                />
                <p className="font-body text-sm">{errorMsg}</p>
                <div className="mt-1 flex gap-2">
                  <button
                    type="button"
                    onClick={() => activeLang && startCall(activeLang)}
                    className="rounded-lg px-4 py-2 font-body text-sm font-semibold"
                    style={{
                      background: "hsl(var(--gold))",
                      color: "hsl(var(--forest-dark))",
                    }}
                  >
                    Retry
                  </button>
                  <button
                    type="button"
                    onClick={() => setPhase("idle")}
                    className="rounded-lg px-4 py-2 font-body text-sm"
                    style={{ background: "hsl(var(--forest-light))" }}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
