package com.garden_group.forum.application.query;

import com.garden_group.forum.shared.utils.Constants;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SearchVoteQueryFilters {

    private Boolean isOnlyUpVotes;

    private String orderBy;

    private String sortDirection = Constants.DEFAULT_SORT_DIRECTION;

    @Min(value = 0, message = "Page start must be 0 or greater")
    private Integer pageStart = Constants.PAGE_START;

    @Min(value = 1, message = "Page size must be 1 or greater")
    private Integer size = Constants.PAGE_SIZE;

}
