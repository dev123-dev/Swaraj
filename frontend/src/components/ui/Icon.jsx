import useScreenSize from "../../hooks/useScreenSize";

export default function Icon({
  name,
  title,
  size,
  color,
  outerClass,
  outerStyle,
  onClick,
  noCursor,
  disabled,
}) {
  const { width } = useScreenSize();
  const finalSize = size || "1.5rem";

  return (
    <div
      data-title={width > 672 ? title : null}
      className={`flex-center ${outerClass} ${disabled && "icon-disabled"}`}
      onClick={disabled ? undefined : onClick}
      style={{ cursor: !noCursor && !disabled && "pointer", ...outerStyle }}
    >
      {name && (
        <svg
          style={{ height: finalSize, width: finalSize, fill: color, color }}
        >
          <use xlinkHref={`/icons.svg#${name}`}></use>
        </svg>
      )}
    </div>
  );
}
