export function random(min, max) {
  return Math.random() * (max-min) + min
}

export function dice(d, p) {
  return random(d, d*p)
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
