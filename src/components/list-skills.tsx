import { useEffect, useState } from "react";

interface Skill {
  name: string;
  imageUrl: string;
}

interface ListSkillsProps {
  skills: Skill[];
}

export function ListSkills({ skills }: ListSkillsProps) {
  const [offset, setOffset] = useState(0);
  const itemWidth = 150;

  const totalWidth = itemWidth * skills.length;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOffset((prevOffset) => {
        const newOffset = prevOffset - 2;
        if (Math.abs(newOffset) >= totalWidth) {
          return 0;
        }
        return newOffset;
      });
    }, 16);

    return () => clearInterval(intervalId);
  }, [totalWidth]);

  return (
    <div className="overflow-hidden py-4 rounded-md bg-gradient-to-r from-primary to-accent">
      <div
        className="flex items-center"
        style={{
          transform: `translateX(${offset}px)`,
          width: `${totalWidth * 2}px`,
        }}
      >
        {skills.concat(skills).map((skill, index) => (
          <div
            key={index}
            className="flex flex-col items-center mx-4"
            style={{ width: `${itemWidth}px` }}
          >
            <img
              src={skill.imageUrl}
              alt={skill.name}
              className="w-16 h-16 bg-white rounded-lg p-2"
            />
            <span className="mt-2 text-sm font-medium text-white">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
