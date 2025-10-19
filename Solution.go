
package main

type TopVotedCandidate struct {
    persons                    []int
    times                      []int
    timelineTopVotedCandidates []int
}

func Constructor(persons []int, times []int) TopVotedCandidate {
    topVotedCandidate := TopVotedCandidate{
        times:                      times,
        timelineTopVotedCandidates: createTimelineTopVotedCandidates(persons),
    }
    return topVotedCandidate
}

func createTimelineTopVotedCandidates(persons []int) []int {
    topVotedCandidate := 0
    votesForTopVotedCandidate := 0
    votesPerCandidate := make([]int, len(persons))
    timelineTopVotedCandidates := make([]int, len(persons))

    for i := range persons {

        votesPerCandidate[persons[i]]++
        if votesForTopVotedCandidate <= votesPerCandidate[persons[i]] {
            topVotedCandidate = persons[i]
            votesForTopVotedCandidate = votesPerCandidate[persons[i]]
        }
        timelineTopVotedCandidates[i] = topVotedCandidate
    }
    return timelineTopVotedCandidates
}

func (this *TopVotedCandidate) Q(time int) int {
    index := this.searchForIndexUpperTimeBoundary(time)
    return this.timelineTopVotedCandidates[index]
}

func (this *TopVotedCandidate) searchForIndexUpperTimeBoundary(time int) int {
    left := 0
    right := len(this.times) - 1

    for left <= right {
        middle := left + (right - left) / 2

        if this.times[middle] == time {
            return middle
        }

        if this.times[middle] < time {
            left = middle + 1
        } else {
            right = middle - 1
        }
    }
    return right
}
