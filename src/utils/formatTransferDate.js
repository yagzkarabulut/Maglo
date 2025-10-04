export default function formatTransferDate(dateStr) {
  try {
    const d = new Date(dateStr);
    const core = d.toLocaleDateString('en-US', { month: 'long', day: '2-digit', year: 'numeric' });
    const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    return `${core} at ${time}`;
  } catch {
    return dateStr;
  }
}
