import { useEffect, useState } from 'react'

const formatter = new Intl.DateTimeFormat('tr-TR', {
  timeZone: 'Europe/Istanbul',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

const format = () => formatter.format(new Date())

export function useIstanbulClock() {
  const [time, setTime] = useState(() => format())

  useEffect(() => {
    const id = window.setInterval(() => setTime(format()), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}
