import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Check, ThumbsUp } from "lucide-react";
import BottomNav from "@/components/BottomNav";

const pollOptions = [
  { id: 1, name: "Thai Green Curry", emoji: "🍛", votes: 2, voters: ["Anna", "Max"] },
  { id: 2, name: "Pasta Primavera", emoji: "🍝", votes: 1, voters: ["Sara"] },
  { id: 3, name: "Grilled Salmon", emoji: "🐟", votes: 0, voters: [] },
  { id: 4, name: "Butter Chicken", emoji: "🍗", votes: 1, voters: ["Tom"] },
];

const householdMembers = [
  { name: "Emil (You)", avatar: "E", voted: false },
  { name: "Anna", avatar: "A", voted: true },
  { name: "Max", avatar: "M", voted: true },
  { name: "Sara", avatar: "S", voted: true },
  { name: "Tom", avatar: "T", voted: true },
];

const HouseholdVoting = () => {
  const navigate = useNavigate();
  const [options, setOptions] = useState(pollOptions);
  const [myVote, setMyVote] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const castVote = (id: number) => {
    if (submitted) return;
    setMyVote(id);
  };

  const submitVote = () => {
    if (myVote === null) return;
    setOptions((prev) =>
      prev.map((o) =>
        o.id === myVote ? { ...o, votes: o.votes + 1, voters: [...o.voters, "Emil"] } : o
      )
    );
    setSubmitted(true);
  };

  const totalVotes = options.reduce((s, o) => s + o.votes, 0) + (submitted ? 0 : myVote !== null ? 0 : 0);

  return (
    <div className="app-container bg-background px-6 pt-6 pb-28 min-h-screen">
      <div className="flex items-center gap-4 mb-1">
        <button onClick={() => navigate(-1)} className="text-foreground">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <Users className="w-6 h-6 text-primary" />
      </div>

      <h1 className="text-2xl font-bold text-foreground mb-0.5">Household Vote</h1>
      <p className="text-muted-foreground mb-6">Vote for tomorrow's dinner! 🍽️</p>

      {/* Members status */}
      <div className="bg-card rounded-2xl p-4 mb-6 shadow-sm">
        <h3 className="font-bold text-foreground mb-3">Members</h3>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {householdMembers.map((m) => (
            <div key={m.name} className="flex flex-col items-center gap-1 min-w-[56px]">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold ${
                m.voted || (m.name.includes("You") && submitted)
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-foreground"
              }`}>
                {m.avatar}
              </div>
              <span className="text-xs text-muted-foreground text-center leading-tight">{m.name.split(" ")[0]}</span>
              {(m.voted || (m.name.includes("You") && submitted)) && (
                <Check className="w-3.5 h-3.5 text-primary" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Voting options */}
      <h3 className="font-bold text-foreground mb-3">Choose your pick</h3>
      <div className="space-y-3 mb-6">
        {options.map((o) => {
          const isSelected = myVote === o.id;
          const pct = totalVotes > 0 ? Math.round((o.votes / (totalVotes + (submitted ? 0 : 1))) * 100) : 0;
          return (
            <button
              key={o.id}
              onClick={() => castVote(o.id)}
              disabled={submitted}
              className={`w-full rounded-2xl p-4 text-left transition-all border-2 ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-transparent bg-secondary"
              } ${submitted ? "opacity-90" : ""}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{o.emoji}</span>
                <span className="flex-1 font-bold text-foreground">{o.name}</span>
                {isSelected && !submitted && (
                  <Check className="w-5 h-5 text-primary" />
                )}
                {submitted && (
                  <span className="text-sm font-bold text-primary">{o.votes} votes</span>
                )}
              </div>
              {submitted && (
                <>
                  <div className="h-2 rounded-full bg-card mb-1.5">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{o.voters.join(", ") || "No votes yet"}</span>
                  </div>
                </>
              )}
            </button>
          );
        })}
      </div>

      {!submitted ? (
        <button
          onClick={submitVote}
          disabled={myVote === null}
          className={`w-full py-4 rounded-2xl font-semibold text-lg transition-all ${
            myVote !== null
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 active:scale-[0.98]"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          Submit Vote
        </button>
      ) : (
        <div className="bg-card rounded-2xl p-5 text-center shadow-sm">
          <Check className="w-10 h-10 text-primary mx-auto mb-2" />
          <h3 className="font-bold text-foreground mb-1">Vote Submitted!</h3>
          <p className="text-sm text-muted-foreground">Results will be finalized tonight at 8 PM</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default HouseholdVoting;
