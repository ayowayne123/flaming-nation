import Side from "./sideNav";

export default function AdminLayout({ children }) {
  return (
    <div className="flex flex-row h-screen">
      <Side />
      <div className="">{children}</div>
    </div>
  );
}
