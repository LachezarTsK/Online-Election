
class TopVotedCandidate {

    times: number[];
    timelineTopVotedCandidates: number[];

    constructor(persons: number[], times: number[]) {
        this.times = times;
        this.timelineTopVotedCandidates = this.createTimelineTopVotedCandidates(persons);
    }

    createTimelineTopVotedCandidates(persons: number[]): number[] {
        let topVotedCandidate = 0;
        let votesForTopVotedCandidate = 0;
        const votesPerCandidate: number[] = new Array(persons.length).fill(0);
        const timelineTopVotedCandidates: number[] = new Array(persons.length).fill(0);

        for (let i = 0; i < persons.length; ++i) {

            ++votesPerCandidate[persons[i]];
            if (votesForTopVotedCandidate <= votesPerCandidate[persons[i]]) {
                topVotedCandidate = persons[i];
                votesForTopVotedCandidate = votesPerCandidate[persons[i]];
            }
            timelineTopVotedCandidates[i] = topVotedCandidate;
        }
        return timelineTopVotedCandidates;
    }

    q(time: number): number {
        const index = this.searchForIndexUpperTimeBoundary(time);
        return this.timelineTopVotedCandidates[index];
    }

    searchForIndexUpperTimeBoundary(time: number): number {
        let left = 0;
        let right = this.times.length - 1;

        while (left <= right) {
            const middle = left + Math.floor((right - left) / 2);

            if (this.times[middle] === time) {
                return middle;
            }

            if (this.times[middle] < time) {
                left = middle + 1;
            } else {
                right = middle - 1;
            }
        }
        return right;
    }
}
