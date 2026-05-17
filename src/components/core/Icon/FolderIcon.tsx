const FolderIcon = () => {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ imageRendering: 'pixelated' }}
    >
      {/* Classic Mac folder - pixel art style */}
      <rect x="2" y="10" width="28" height="18" fill="white" stroke="black" strokeWidth="2" />
      <path d="M2 10 L2 8 L12 8 L14 10 L30 10" fill="white" stroke="black" strokeWidth="2" />

      {/* Folder tab */}
      <rect x="2" y="8" width="10" height="2" fill="white" />
      <line x1="12" y1="8" x2="14" y2="10" stroke="black" strokeWidth="2" />
    </svg>
  );
};

export default FolderIcon;
