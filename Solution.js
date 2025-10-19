
class TopVotedCandidate {

    /**
     * @param {number[]} persons
     * @param {number[]} times
     */
    constructor(persons, times) {
        this.times = times;
        this.timelineTopVotedCandidates = this.createTimelineTopVotedCandidates(persons);
    }

    /**
     * @param {number[]} persons
     * @param {number[]}
     */
    createTimelineTopVotedCandidates(persons) {
        let topVotedCandidate = 0;
        let votesForTopVotedCandidate = 0;
        const votesPerCandidate = new Array(persons.length).fill(0);
        const timelineTopVotedCandidates = new Array(persons.length).fill(0);

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

    /** 
     * @param {number} time
     * @return {number}
     */
    q(time) {
        const index = this.searchForIndexUpperTimeBoundary(time);
        return this.timelineTopVotedCandidates[index];
    }

    /** 
     * @param {number} time
     * @return {number}
     */
    searchForIndexUpperTimeBoundary(time) {
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
