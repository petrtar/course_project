export function getQueryParams(params: OptionalRecord<string, string>) {
    const searchParam = new URLSearchParams(window.location.search);

    Object.entries(params).forEach(([name, value]) => {
        if (value !== undefined) {
            searchParam.set(name, value);
        }
    });

    return `?${searchParam.toString()}`;
}

/**
 * Функция добавления параметров строки запроса в URL
 * @param params
 */
export function addQueryParams(params: OptionalRecord<string, string>) {
    window.history.pushState(null, "", getQueryParams(params));
}
