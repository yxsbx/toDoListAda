let currentFetchController = null;

function abortCurrentFetch() {
    if (currentFetchController) {
        currentFetchController.abort();
    }
}

export function fetchWithAbort(url, onSuccess, onError) {
    abortCurrentFetch();

    currentFetchController = new AbortController();
    const signal = currentFetchController.signal;

    fetch(url, { signal })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Failed to load ${url}`);
            }
            return response.text();
        })
        .then(onSuccess)
        .catch((error) => {
            if (error.name !== 'AbortError') {
                console.error('Fetch error:', error);
                onError(error);
            }
        });
}
