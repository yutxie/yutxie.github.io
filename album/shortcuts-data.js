// Shortcut display rows — edit descriptions here to update the welcome screen and cheatsheet.
// Each entry: { label, desc, dim (optional) }
// "dim: true" renders the row in a lighter color (for secondary/contextual hints).

const SHORTCUT_ROWS = [
  { label: '→',     desc: 'random jump / next in chain' },
  { label: '→',     desc: '(hold) jump to last in chain', dim: false },
  { label: '←',     desc: 'previous in chain' },
  { label: '↑',     desc: 'love / unlove this photo' },
  { label: '↓',     desc: 'toggle history chain' },
  { label: '/',     desc: 'toggle shortcut cheatsheet' },
  { label: 'esc',   desc: 'clear history chain' },
  { label: 'space', desc: 'back to welcome screen' },
];

const THANKYOU_HINT = [
  { label: '←',     desc: 'last photo' },
  { label: 'space', desc: 'back to welcome' },
];
