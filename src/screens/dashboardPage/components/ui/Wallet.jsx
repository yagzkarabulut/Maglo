import "../styles/wallet.css";

// Figma'ya uygun, dinamik ve modern bir Wallet/Card componenti
const Wallet = ({
  bankName = "Maglo.",
  cardType = "Universal Bank",
  cardNumber = "5495 7381 3759 2321",
  cardLogo = "https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg",
  chip = true,
  expiry = "09/25",
  owner = "",
  gradient = true,
  secondary = false,
}) => {
  return (
    <div
  className={`relative w-full max-w-[420px] h-[210px] rounded-3xl p-6 shadow-2xl flex flex-col justify-between overflow-hidden border border-gray-700 
        ${gradient
          ? secondary
            ? "bg-gradient-to-br from-gray-700 via-gray-900 to-gray-800"
            : "bg-gradient-to-br from-[#23242b] via-[#23242b] to-[#181920]"
          : "bg-gray-800"}
      `}
      style={{boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.25)'}}
    >
      {/* Chip ve logo */}
      <div className="flex items-center justify-between mb-6">
        {chip && (
          <div className="w-10 h-7 bg-gray-200 rounded-md flex items-center justify-center shadow-inner">
            <div className="w-6 h-3 bg-gray-400 rounded-sm"></div>
          </div>
        )}
        <img src={cardLogo} alt="Card Logo" className="h-8 ml-auto drop-shadow" />
      </div>
      {/* Banka adı ve tip */}
      <div className="mb-1">
        <div className="text-white text-xl font-bold tracking-wider drop-shadow-sm">{bankName}</div>
        <div className="text-gray-300 text-xs font-medium tracking-wide">{cardType}</div>
      </div>
      {/* Kart numarası */}
      <div className="text-white text-2xl font-mono tracking-[0.25em] mb-3 select-text drop-shadow">
        {cardNumber}
      </div>
      {/* Alt bilgiler */}
      <div className="flex items-center justify-between text-xs text-gray-200 mt-2">
        <div>
          <div className="opacity-60 text-[10px]">VALID THRU</div>
          <div className="font-semibold tracking-wider text-sm">{expiry}</div>
        </div>
        {owner && <div className="font-semibold tracking-wider text-sm">{owner}</div>}
      </div>
      {/* Parlak overlay efekti */}
      <div className="absolute left-0 top-0 w-full h-full pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 350 210" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute">
          <ellipse cx="260" cy="-30" rx="120" ry="60" fill="#fff" fillOpacity="0.08" />
          <ellipse cx="60" cy="220" rx="120" ry="60" fill="#fff" fillOpacity="0.06" />
        </svg>
      </div>
    </div>
  );
};

export default Wallet;
