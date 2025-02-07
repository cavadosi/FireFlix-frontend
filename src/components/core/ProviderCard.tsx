import { WatchProvider } from "@/types";

export default function ProviderCard({ provider }: { provider: WatchProvider }) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-lg flex-shrink-0 basis-1/3 ">
      <img
        src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
        alt={provider.provider_name}
        className=" w-11 h-11 rounded-lg object-cover mb-2"
      />
      <span className="text-sm font-semibold text-center line-clamp-2">{provider.provider_name}</span>
    </div>
  );
}
