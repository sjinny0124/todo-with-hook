import React, {useState, useEffect} from 'react';
import Battery from './Battery';

function useBattery() {
  const [level, setLevel] = useState(0);
  const [charging, setCharging] = useState(false);

  useEffect(() => {
    let battery;
    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener('levelchange', handleChange);
      handleChange({target: battery});
    });
    return () => {
      battery.removeEventListener('levelchange', handleChange);
    };
  }, [level]);

  useEffect(() => {
    let battery;
    navigator.getBattery().then(bat => {
      battery = bat;
      battery.addEventListener('chargingchange', handleChange);
      handleChange({target: battery});
    });
    return () => {
      battery.removeEventListener('chargingchange', handleChange);
    };
  }, [charging]);

  const handleChange = ({target: {level, charging}}) => {
    setLevel(level);
    setCharging(charging);
  };

  return [
    {
      level,
      charging,
    },
  ];
}
export default function BatteryEffect(props) {
  const [battery] = useBattery();
  return (
    <section>
      <Battery {...battery} />
    </section>
  );
}
