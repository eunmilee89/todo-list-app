import type { FilterValue } from "../../App";

type HeaderProps = {
  filters: FilterValue[];
  filter: FilterValue;
  onFilterChange: (filter: FilterValue) => void;
};

export default function Header({
  filters,
  filter,
  onFilterChange,
}: HeaderProps) {
  return (
    <ul>
      {filters.map((value, index) => (
        <li key={index}>
          <button
            onClick={() => onFilterChange(value)}
            style={{ fontWeight: filter === value ? "bold" : "normal" }}
          >
            {value}
          </button>
        </li>
      ))}
    </ul>
  );
}
