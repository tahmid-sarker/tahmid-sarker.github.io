"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  forwardRef,
  type ComponentPropsWithoutRef,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import type { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from "embla-carousel";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonSize, type ButtonVariant } from "@/components/shared/button";

type CarouselApi = EmblaCarouselType;
type CarouselOptions = EmblaOptionsType;
type CarouselPlugin = EmblaPluginType;

interface CarouselContextValue {
  carouselRef: UseEmblaCarouselType[0];
  api: CarouselApi | undefined;
  opts?: CarouselOptions;
  orientation: "horizontal" | "vertical";
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
}

interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  opts?: CarouselOptions;
  setApi?: (api: CarouselApi) => void;
  plugins?: CarouselPlugin[];
  className?: string;
  children?: ReactNode;
}

interface CarouselContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  viewportClassName?: string;
}

interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

interface CarouselButtonProps extends ComponentPropsWithoutRef<typeof Button> {
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const CarouselContext = createContext<CarouselContextValue | null>(null);

const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
};

const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === "horizontal" ? "x" : "y",
      },
      plugins,
    );

    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(false);

    const onSelect = useCallback((api: CarouselApi) => {
      if (!api) return;
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

    const scrollPrev = useCallback(() => {
      emblaApi?.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
      emblaApi?.scrollNext();
    }, [emblaApi]);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollNext();
        }
      },
      [scrollPrev, scrollNext],
    );

    useEffect(() => {
      if (!emblaApi || !setApi) return;
      setApi(emblaApi);
    }, [emblaApi, setApi]);

    useEffect(() => {
      if (!emblaApi) return;
      // Seed scroll affordance state from Embla, then subscribe to updates.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sync with Embla API
      onSelect(emblaApi);
      emblaApi.on("reInit", onSelect);
      emblaApi.on("select", onSelect);
      return () => {
        emblaApi.off("reInit", onSelect);
        emblaApi.off("select", onSelect);
      };
    }, [emblaApi, onSelect]);

    return (
      <CarouselContext.Provider
        value={{
          carouselRef: emblaRef,
          api: emblaApi,
          opts,
          orientation:
            orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
        }}
      >
        <div
          ref={ref}
          onKeyDown={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = forwardRef<HTMLDivElement, CarouselContentProps>(
  ({ className, viewportClassName, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();

    return (
      <div
        ref={carouselRef}
        className={cn(
          "overflow-hidden cursor-grab active:cursor-grabbing",
          viewportClassName,
        )}
      >
        <div
          ref={ref}
          className={cn(
            "flex",
            orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
CarouselContent.displayName = "CarouselContent";

const CarouselItem = forwardRef<HTMLDivElement, CarouselItemProps>(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        className={cn(
          "min-w-0 shrink-0 grow-0 basis-full",
          orientation === "horizontal" ? "pl-4" : "pt-4",
          className,
        )}
        {...props}
      />
    );
  },
);
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-7 w-7 rounded-full shadow-lg transition-all duration-300",
          orientation === "horizontal"
            ? "-left-12 top-1/2 -translate-y-1/2"
            : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          canScrollPrev
            ? "bg-accent text-white border-0 hover:scale-110 hover:shadow-accent/40 active:scale-95 cursor-pointer opacity-100"
            : "opacity-0 pointer-events-none",
          className,
        )}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span className="sr-only">Previous slide</span>
      </Button>
    );
  },
);
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = forwardRef<HTMLButtonElement, CarouselButtonProps>(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Button
        ref={ref}
        variant={variant}
        size={size}
        className={cn(
          "absolute h-7 w-7 rounded-full shadow-lg transition-all duration-300",
          orientation === "horizontal"
            ? "-right-12 top-1/2 -translate-y-1/2"
            : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          canScrollNext
            ? "bg-accent text-white border-0 hover:scale-110 hover:shadow-accent/40 active:scale-95 cursor-pointer opacity-100"
            : "opacity-0 pointer-events-none",
          className,
        )}
        disabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
      >
        <ArrowRight className="h-3.5 w-3.5" />
        <span className="sr-only">Next slide</span>
      </Button>
    );
  },
);
CarouselNext.displayName = "CarouselNext";

export { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext };
