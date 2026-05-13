import "./SettingsCard.css";

export default function SettingsCard({
  icon,
  name,
  borderColor = "var(--color-primary)",
  toggleSettings,
}) {
  return (
    <div
      style={{
        borderLeft: `5px solid ${borderColor}`,
      }}
      className=" flex items-center justify-between flex-1  settings-card"
    >
      <div className="flex items-center gap-1">
        {icon}
        <p>{name}</p>
      </div>

      <button 
      className="btn bg-success-light text-secondary "
      onClick={toggleSettings}
      >
        Edit
      </button>
    </div>
  );
}
