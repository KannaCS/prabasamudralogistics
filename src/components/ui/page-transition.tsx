"use client";

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { pageTransitions } from '@/lib/animations';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    if (containerRef.current) {
      // Page entrance animation
      pageTransitions.fadeIn(containerRef.current);
    }
  }, [pathname]);

  return (
    <div 
      ref={containerRef}
      className={`page-transition-container ${className}`}
    >
      {children}
    </div>
  );
}

// Higher-order component for wrapping pages with transitions
export function withPageTransition<T extends object>(
  Component: React.ComponentType<T>,
  transitionType: 'fadeIn' | 'slideInFromLeft' | 'slideInFromRight' | 'scaleIn' = 'fadeIn'
) {
  return function TransitionWrappedComponent(props: T) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathname = usePathname();

    useEffect(() => {
      if (containerRef.current) {
        // Apply the specified transition
        pageTransitions[transitionType](containerRef.current);
      }
    }, [pathname]);

    return (
      <div ref={containerRef} className="page-wrapper">
        <Component {...props} />
      </div>
    );
  };
}

// Loading transition component
export function LoadingTransition({ isLoading }: { isLoading: boolean }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      if (isLoading) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          visibility: 'visible',
          duration: 0.3,
          ease: 'power2.out',
        });
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          visibility: 'hidden',
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2,
        });
      }
    }
  }, [isLoading]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-white z-50 flex items-center justify-center opacity-0 invisible"
      style={{ pointerEvents: isLoading ? 'auto' : 'none' }}
    >
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4"></div>
        <p className="text-primary-500 font-medium">Loading...</p>
      </div>
    </div>
  );
}