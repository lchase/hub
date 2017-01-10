export default function (state = { isPinging: false }, action) {
  switch (action.type) {
    case 'PING':
      console.log("PingReducer: PING received");
      return { isPinging: true };

    case 'PONG':
      console.log("PingReducer: PONG received");
      return { isPinging: false };

    default:
      return state;
  }
}