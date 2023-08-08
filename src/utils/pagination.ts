export default function pagination(totalDocs, limit, page) {
    const totalPages = Math.ceil(totalDocs / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    return {
        totalDocs,
        limit,
        page,
        nextPage: hasNextPage ? page + 1 : null,
        prevPage: hasPrevPage ? page - 1 : null,
        hasNextPage,
        hasPrevPage,
        totalPages,
        pagingCounter: (page - 1) * limit + 1,
    };
}