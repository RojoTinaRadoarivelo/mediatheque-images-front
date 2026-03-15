import type { FC } from "react";

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  offLabel?: string;
  onLabel?: string;
  trackBg?: string;
  thumbBg?: string;
  offLabelColor?: string;
  onLabelColor?: string;
  width?: number;
  height?: number;
  thumbSize?: number;
}

const ToggleSwitch: FC<ToggleSwitchProps> = ({
  checked,
  onChange,
  offLabel,
  onLabel,
  trackBg = "bg-gray-300",
  thumbBg = "bg-black",
  offLabelColor = "text-gray-500",
  onLabelColor = "text-gray-800",
  width = 64,
  height = 32,
  thumbSize = 24,
}) => {
  const inset = 2;
  const thumbOffset = checked ? width - thumbSize - inset : inset;
  const compact = height <= 24;
  const labelClass = compact ? "text-[10px]" : "text-xs";
  const labelInset = compact ? "left-1.5" : "left-2";
  const labelInsetRight = compact ? "right-1.5" : "right-2";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`button-reset relative inline-flex items-center rounded-full border border-transparent ${trackBg}`}
      style={{ width, height }}
    >
      {offLabel && (
        <span
          className={`absolute ${labelInset} ${labelClass} leading-none ${offLabelColor}`}
        >
          {offLabel}
        </span>
      )}
      {onLabel && (
        <span
          className={`absolute ${labelInsetRight} ${labelClass} leading-none ${onLabelColor}`}
        >
          {onLabel}
        </span>
      )}
      <span
        className={`absolute rounded-full transition-all duration-200 ease-out ${thumbBg}`}
        style={{ width: thumbSize, height: thumbSize, left: thumbOffset }}
      />
    </button>
  );
};

export default ToggleSwitch;
