import { useQueueContext } from "../context/queueContext";

export default function useQueueUtils() {
  const { input, queue, setQueue, setInput, setPop, front, setFront } = useQueueContext();

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const pushToQueue = () => {
    if (!input.trim()) return;
    setQueue((prev) => [...prev, input]); // Push at end (rear)
    setInput("");
  };

  const popFromQueue = async () => {
    if (queue.length === 0) return;

    setPop(queue.length-1); // Front index
    await sleep(300);

    const updatedQueue = queue.slice(1); // Remove from front
    setQueue(updatedQueue);
    setPop(-1);
  };

  const frontOfQueue = async () => {
    if (queue.length === 0) return;

    setFront(0); // Front index
    await sleep(600);
    setFront(-1);
  };

  const emptyQueue = () => {
    setQueue([]);
  };

  return {
    pushToQueue,
    popFromQueue,
    frontOfQueue,
    emptyQueue,
  };
}
