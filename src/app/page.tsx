import MusicPlayer from "@/components/custom/music-player";
import PomodoroTimer from "@/components/custom/pomodoro-timer";
import TaskList from "@/components/custom/task-list";

export default function Home() {
  return (
    <main className="container mx-auto p-4 min-h-screen flex flex-col relative">
      <h1 className="text-3xl font-bold mb-6">ChillTask</h1>

      <div className="absolute top-16 right-4 z-50">
        <MusicPlayer />
      </div>

      <div className="flex-grow flex flex-col items-center">
        <div className="w-full max-w-md mb-8">
          <PomodoroTimer />
          <TaskList />
        </div>
        <div className="w-full flex flex-col md:flex-row justify-between gap-8">
          <div className="w-full md:w-5/12 md:max-w-sm"></div>
        </div>
      </div>
    </main>
  );
}
