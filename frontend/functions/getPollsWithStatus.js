export const getPollsWithStatus = (polls) => {
  polls.map(poll => {
    let now = Date.now()
    if (now > Date.parse(poll.end_time))
      poll.status = 'end'
    else if (now < Date.parse(poll.end_time) && now > Date.parse(poll.start_time))
      poll.status = 'start'
    else if (now < Date.parse(poll.end_time))
      poll.status = 'wait'
  })
  return polls
}