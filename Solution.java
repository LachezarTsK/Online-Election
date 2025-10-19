
public class TopVotedCandidate {

    private final int[] times;
    private final int[] timelineTopVotedCandidates;

    public TopVotedCandidate(int[] persons, int[] times) {
        this.times = times;
        timelineTopVotedCandidates = createTimelineTopVotedCandidates(persons);
    }

    private int[] createTimelineTopVotedCandidates(int[] persons) {

        int topVotedCandidate = 0;
        int votesForTopVotedCandidate = 0;
        int[] votesPerCandidate = new int[persons.length];
        int[] timelineTopVotedCandidates = new int[persons.length];

        for (int i = 0; i < persons.length; ++i) {

            ++votesPerCandidate[persons[i]];
            if (votesForTopVotedCandidate <= votesPerCandidate[persons[i]]) {
                topVotedCandidate = persons[i];
                votesForTopVotedCandidate = votesPerCandidate[persons[i]];
            }
            timelineTopVotedCandidates[i] = topVotedCandidate;
        }
        return timelineTopVotedCandidates;
    }

    public int q(int time) {
        int index = searchForIndexUpperTimeBoundary(time);
        return timelineTopVotedCandidates[index];
    }

    private int searchForIndexUpperTimeBoundary(int time) {
        int left = 0;
        int right = times.length - 1;

        while (left <= right) {
            int middle = left + (right - left) / 2;

            if (times[middle] == time) {
                return middle;
            }

            if (times[middle] < time) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
