export default function cleanChunk(chunk) {
  return chunk
    .replace(/```[\s\S]*?```/g, '')         // Remove triple backtick code blocks
    .replace(/`{1,3}(.*?)`{1,3}/g, '$1')     // Remove inline or triple backtick code
    .replace(/\*\*\*(.*?)\*\*\*/g, '$1')    // Remove ***bold italic***
    .replace(/\*\*(.*?)\*\*/g, '$1')        // Remove **bold**
    .replace(/\*(.*?)\*/g, '$1')            // Remove *italic* or bullet
    .replace(/^\s*[-*+] /gm, '')            // Remove list markers like - or *
    .replace(/\s{2,}/g, ' ')                // Collapse extra spaces
    .trim();
}
