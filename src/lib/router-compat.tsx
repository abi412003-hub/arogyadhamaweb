"use client";

/**
 * react-router-dom → Next.js navigation compatibility shim.
 *
 * Lets components written for react-router-dom keep working under the Next.js
 * App Router with only their import source changed to "@/lib/router-compat".
 * Covers the APIs this codebase actually uses: Link, NavLink, Navigate,
 * useLocation, useNavigate, useParams, useSearchParams.
 */

import NextLink from "next/link";
import {
  usePathname,
  useRouter,
  useParams as useNextParams,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { forwardRef, useEffect, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type AnchorProps = Omit<ComponentProps<typeof NextLink>, "href">;

interface LinkProps extends AnchorProps {
  to?: string;
  href?: string;
  // react-router-only props we accept and ignore so the DOM stays clean
  state?: unknown;
  replace?: boolean;
  reloadDocument?: boolean;
  preventScrollReset?: boolean;
  relative?: "route" | "path";
  end?: boolean;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, href, state, reloadDocument, preventScrollReset, relative, end, ...rest },
  ref,
) {
  const dest = (to ?? href ?? "#") as string;
  return <NextLink ref={ref} href={dest} {...rest} />;
});

interface NavLinkProps extends LinkProps {
  activeClassName?: string;
  className?: string;
}

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(function NavLink(
  { to, href, end, className, activeClassName, ...rest },
  ref,
) {
  const pathname = usePathname() || "/";
  const dest = (to ?? href ?? "#") as string;
  const isActive = end
    ? pathname === dest
    : pathname === dest || pathname.startsWith(dest + "/");
  return (
    <NextLink
      ref={ref}
      href={dest}
      className={cn(className, isActive && activeClassName)}
      aria-current={isActive ? "page" : undefined}
      {...rest}
    />
  );
});

export function useLocation() {
  // Intentionally avoids useSearchParams() so it does not force a client-side
  // bailout during rendering. Components that need query params should call
  // useSearchParams() directly.
  const pathname = usePathname() || "/";
  return { pathname, search: "", hash: "", state: null, key: "default" };
}

export function useNavigate() {
  const router = useRouter();
  return (to: string | number, opts?: { replace?: boolean }) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    if (opts?.replace) router.replace(to);
    else router.push(to);
  };
}

export function useParams<T extends Record<string, string> = Record<string, string>>() {
  return (useNextParams() as unknown) as T;
}

type SetSearchParams = (
  next:
    | URLSearchParams
    | Record<string, string>
    | ((prev: URLSearchParams) => URLSearchParams),
  opts?: { replace?: boolean },
) => void;

export function useSearchParams(): [URLSearchParams, SetSearchParams] {
  const sp = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname() || "/";
  const current = new URLSearchParams(sp ? sp.toString() : "");

  const setSearchParams: SetSearchParams = (next, opts) => {
    let params: URLSearchParams;
    if (typeof next === "function") params = next(new URLSearchParams(current.toString()));
    else if (next instanceof URLSearchParams) params = next;
    else params = new URLSearchParams(next);
    const qs = params.toString();
    const url = qs ? `${pathname}?${qs}` : pathname;
    if (opts?.replace) router.replace(url);
    else router.push(url);
  };

  return [current, setSearchParams];
}

export function Navigate({
  to,
  replace,
}: {
  to: string;
  replace?: boolean;
  children?: ReactNode;
}) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [to, replace, router]);
  return null;
}

export type { LinkProps, NavLinkProps };
