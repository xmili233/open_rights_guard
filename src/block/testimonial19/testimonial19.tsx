"use client";

import AutoScroll from "embla-carousel-auto-scroll";
import { Star } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TestimonialItem {
  id?: string;
  name: string;
  avatar: string;
  content: string;
  role?: string;
}

interface Testimonial19Props {
  heading: string;
  description: string;
  testimonials: TestimonialItem[];
  className?: string;
}

function Testimonial19({
  heading,
  description,
  testimonials,
  className,
}: Testimonial19Props) {
  const [plugin] = useState(() =>
    AutoScroll({
      startDelay: 500,
      speed: 0.7,
    }),
  );

  return (
    <section className={cn("overflow-hidden py-24 md:py-32", className)}>
      <div className="container mx-auto flex flex-col items-center gap-4">
        <h2 className="text-center text-4xl font-semibold tracking-tight md:text-5xl">
          {heading}
        </h2>
        <p className="text-center text-muted-foreground lg:text-lg">
          {description}
        </p>
      </div>

      <div className="mt-16 lg:container lg:mx-auto">
        <Carousel
          opts={{ loop: true }}
          plugins={[plugin]}
          onMouseEnter={() => plugin.stop()}
          onMouseLeave={() => plugin.play()}
          className="relative before:absolute before:inset-y-0 before:left-0 before:z-10 before:w-20 before:bg-linear-to-r before:from-background before:to-transparent after:absolute after:inset-y-0 after:right-0 after:z-10 after:w-20 after:bg-linear-to-l after:from-background after:to-transparent md:before:w-36 md:after:w-36"
        >
          <CarouselContent>
            {testimonials.slice(0, 6).map((testimonial) => (
              <CarouselItem key={testimonial.id ?? testimonial.name} className="basis-auto py-px">
                <Card className="h-full w-[min(24rem,calc(100vw-3rem))] p-6 select-none">
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="size-10 shrink-0 rounded-full ring-1 ring-input">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate font-medium">{testimonial.name}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 gap-0.5" aria-label="5 星评价">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star key={index} className="size-4 fill-primary text-primary" />
                      ))}
                    </div>
                  </div>
                  <q className="line-clamp-5 leading-7 text-muted-foreground">
                    {testimonial.content}
                  </q>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}

export { Testimonial19 };
