export const RatingStar = ({ rating }) => {
  const totalStars = 5;

  const safeRating = Math.max(0, Math.min(rating, totalStars));
  const fullStars = Math.floor(safeRating);        // e.g. 1  (1.6)
  const fraction = safeRating - fullStars;         // e.g. 0.6
  const fractionPercent = fraction * 100;          // e.g. 60

  const positions = [
    "translate(-0.001 -1.047)",
    "translate(20.607 -1.047)",
    "translate(41.215 -1.047)",
    "translate(61.823 -1.047)",
    "translate(82.431 -1.047)",
  ];

  const starPath =
    "M9.357,1.558,11.282,5.45a.919.919,0,0,0,.692.5l4.3.624a.916.916,0,0,1,.509,1.564l-3.115,3.029a.916.916,0,0,0-.264.812l.735,4.278a.919.919,0,0,1-1.334.967l-3.85-2.02a.922.922,0,0,0-.855,0l-3.85,2.02a.919.919,0,0,1-1.334-.967l.735-4.278a.916.916,0,0,0-.264-.812L.279,8.14A.916.916,0,0,1,.789,6.576l4.3-.624a.919.919,0,0,0,.692-.5L7.71,1.558A.92.92,0,0,1,9.357,1.558Z";

  // same logic jo tum use kar rahe ho
  const getPercent = (starNum) => {
    if (starNum <= fullStars) return 100;                 // full
    if (starNum === fullStars + 1) return fractionPercent; // fractional
    return 0;                                             // empty
  };

  return (
    <svg viewBox="0 0 99.498 16.286" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {Array.from({ length: totalStars }, (_, i) => {
          const starNum = i + 1;
          const percent = getPercent(starNum);

          // sirf fractional stars ke liye gradient banega
          if (percent <= 0 || percent >= 100) return null;

          const gradientId = `grad-${starNum}`;

          return (
            <linearGradient
              key={gradientId}
              id={gradientId}
              x1="0%"
              x2="100%"
              y1="0%"
              y2="0%"
            >
              <stop offset={`${percent}%`} stopColor="#fc0" />
              <stop offset={`${percent}%`} stopColor="#e9e9e9" />
            </linearGradient>
          );
        })}
      </defs>

      {positions.map((pos, index) => {
        const starNum = index + 1;
        const percent = getPercent(starNum);
        const gradientId = `grad-${starNum}`;

        let fill = "#e9e9e9";              // default empty

        if (percent >= 100) {
          fill = "#fc0";                   // full star solid
        } else if (percent <= 0) {
          fill = "#e9e9e9";                // empty star solid
        } else {
          fill = `url(#${gradientId})`;    // fractional star
        }

        return (
          <path
            key={index}
            transform={pos}
            d={starPath}
            fill={fill}
          />
        );
      })}
    </svg>
  );
};
