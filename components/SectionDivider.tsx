export default function SectionDivider() {
  return (
    <div className="relative mx-auto w-full max-w-[1360px] px-5 sm:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-violet-400/15 to-transparent blur-sm" />
    </div>
  );
}
