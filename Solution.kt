
class TopVotedCandidate(private val persons: IntArray, private val times: IntArray) {

    val timelineTopVotedCandidates = createTimelineTopVotedCandidates()

    private fun createTimelineTopVotedCandidates(): IntArray {
        var topVotedCandidate = 0
        var votesForTopVotedCandidate = 0
        val votesPerCandidate = IntArray(persons.size)
        val timelineTopVotedCandidates = IntArray(persons.size)

        for (i in persons.indices) {

            ++votesPerCandidate[persons[i]]
            if (votesForTopVotedCandidate <= votesPerCandidate[persons[i]]) {
                topVotedCandidate = persons[i]
                votesForTopVotedCandidate = votesPerCandidate[persons[i]]
            }
            timelineTopVotedCandidates[i] = topVotedCandidate
        }
        return timelineTopVotedCandidates
    }

    fun q(time: Int): Int {
        val index = searchForIndexUpperTimeBoundary(time)
        return timelineTopVotedCandidates[index]
    }

    private fun searchForIndexUpperTimeBoundary(time: Int): Int {
        var left = 0
        var right = times.size - 1

        while (left <= right) {
            val middle = left + (right - left) / 2

            if (times[middle] == time) {
                return middle
            }

            if (times[middle] < time) {
                left = middle + 1
            } else {
                right = middle - 1
            }
        }
        return right
    }
}
