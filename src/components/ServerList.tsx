
function ServerList() {
  return (
    <aside className="flex flex-col items-center gap-3 bg-[#1e1f22] px-0 pt-3 pb-4 min-[720px]:pt-4" aria-label="Servers">
      <button className="grid h-11 w-11 cursor-pointer place-items-center rounded-[14px] border-0 bg-[#5865f2] text-lg font-extrabold text-[#f5f6fa] transition hover:-translate-y-px min-[720px]:h-12 min-[720px]:w-12" type="button" aria-label="Design Den">
        D
      </button>
    </aside>
  );
}

export default ServerList;