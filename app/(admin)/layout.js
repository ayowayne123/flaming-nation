import Side from "./sideNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-row  ">
      <Side />
      <div className="w-full ml-[211px] ">{children}</div>
    </div>
  );
}
