import { Duration, DateTime } from "luxon"

const PostedAgo = ({ postedDate }) => {

    const postDate = DateTime.fromISO(postedDate)
    const today = DateTime.now()
    const timeDifference = today.diff(postDate)
    const dur = Duration.fromObject({ milliseconds: timeDifference.values.milliseconds })
    let posted = Math.floor(dur.as("minutes"))
    let postedMessage = ""

    if (posted === 0) {
        postedMessage = " just now"
    } else if (posted === 1) {
        postedMessage = ` ${posted} minute ago`
    } else if (posted < 60) {
        postedMessage = ` ${posted} minutes ago`
    } else if (posted >= 60 && posted < 120) {
        postedMessage = " 1 hour ago"
    } else if (posted >= 120 && posted < 1440) {
        posted = Math.floor(dur.as("hours"))
        postedMessage = ` ${posted} hours ago`
    } else {
        posted = Math.floor(dur.as("days"))
        if (posted === 1) {
            postedMessage = ` ${posted} day ago`
        } else {
            postedMessage = ` ${posted} days ago`
        }
    }
    return postedMessage
}

export default PostedAgo