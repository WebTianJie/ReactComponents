import moment from "moment";

const dateFormate = {
  "YY-MM-DDHMS": "YYYY-MM-DD HH:mm:ss",
};
export function momentToString(momentTime) {
  return moment(momentTime).format(dateFormate["YY-MM-DDHMS"]);
}
