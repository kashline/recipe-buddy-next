import AnimatedLoading from "@/app/ui/loading/animatedloading";

export default function Loading() {
  return (
    <div className="h-full my-auto">
      <AnimatedLoading name="recipe"></AnimatedLoading>
    </div>
  );
}
