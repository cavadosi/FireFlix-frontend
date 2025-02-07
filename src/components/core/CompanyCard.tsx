import { ProductionCompany } from "@/types";

export default function CompanyCard({ company }: { company: ProductionCompany }) {


  return (
    <div className="p-2 flex-grow basis-1/3">
      <div className="flex flex-col items-center">
        {company.logo_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
            alt={company.name}
            className="aspect-video object-contain rounded-lg transition-opacity duration-300 bg-sidebar-foreground p-2 "
            />
        ) : (
          <div className="w-full aspect-video flex items-center justify-center bg-sidebar-foreground rounded-lg">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}
        <p className="text-sm font-medium mt-2 text-center">{company.name}</p>
      </div>
    </div>
  );
}
