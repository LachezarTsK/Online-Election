
using System;

public class TopVotedCandidate
{
    private readonly int[] times;
    private readonly int[] timelineTopVotedCandidates;

    public TopVotedCandidate(int[] persons, int[] times)
    {
        this.times = times;
        timelineTopVotedCandidates = CreateTimelineTopVotedCandidates(persons);
    }

    private int[] CreateTimelineTopVotedCandidates(int[] persons)
    {
        int topVotedCandidate = 0;
        int votesForTopVotedCandidate = 0;
        int[] votesPerCandidate = new int[persons.Length];
        int[] timelineTopVotedCandidates = new int[persons.Length];

        for (int i = 0; i < persons.Length; ++i)
        {
            ++votesPerCandidate[persons[i]];
            if (votesForTopVotedCandidate <= votesPerCandidate[persons[i]])
            {
                topVotedCandidate = persons[i];
                votesForTopVotedCandidate = votesPerCandidate[persons[i]];
            }
            timelineTopVotedCandidates[i] = topVotedCandidate;
        }
        return timelineTopVotedCandidates;
    }

    public int Q(int time)
    {
        int index = SearchForIndexUpperTimeBoundary(time);
        return timelineTopVotedCandidates[index];
    }

    private int SearchForIndexUpperTimeBoundary(int time)
    {
        int left = 0;
        int right = times.Length - 1;

        while (left <= right)
        {
            int middle = left + (right - left) / 2;

            if (times[middle] == time)
            {
                return middle;
            }

            if (times[middle] < time)
            {
                left = middle + 1;
            }
            else
            {
                right = middle - 1;
            }
        }
        return right;
    }
}
