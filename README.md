### Things to find out

* Why Bootstrap styles not being applied to product-list-alt items
* Whether author is using BehaviorSubject of empty Product array for newlyAddedProduct or any other better way
* The way author is using shareReplay
* Where the values are assigned within the service(Within the constructor or directly outside?)
  * Directly outside
* Whether combineLatest is done properly for the different properties

### Problems to fix

* Select in Product List after Navigating from other tabs
  * Use property in Component to store this
* selectedProductSuppliers not giving values for the 1st selection
  * Using BehaviorSubject solved this

### Notes

* No need of ngOnInit when we can directly declare and assign the Observables in the Component
* Use asObservable to expose the Subject or BehaviorSubject used in Services
* Author used Subject or BehaviorSubject in Service when it is common to 2 or more Components, otherwise used it in Component itself
* Use ChangeDetection.OnPush after using Reactive style
* Use of Subjects for Error Message in Component

### Reacting to Actions

* Use of Subject and BehaviorSubject for Action Streams
* Combine the action and data streams
* Emit a value to the action stream when an action occurs
* startWith for initial value for Subjects

### combineLatest, forkJoin and withLatestFrom

* combineLatest for combining the latest values from its Input Observables
  * All the Input Observables must emit once for combineLatest to emit
* forkJoin is for last values of its Input Observables
  * * All the Input Observables must complete for forkJoin to emit
* withLatest is for fetching the latest values when another Source Observable emits
  * If the Source observable completes before withLatestFrom emission, no values are emitted


### Managing state with scan and merge

* scan: retains an accumalated value
* result is buffered and emitted
* When the Observable is complete, it no longer retains its accumulator
* merge combines multiple Observables by merging their emissions
  * When an items is emitted from any Observable, that item is emitted to its output Observable
  * It completes when all Input Observables complete

### Why Caching?

* Making http requests each time you navigate to a Page is not required for Applications that doesn't change data frequently
* Only Highly Transaction based Applications like Flight Reservation or Movie tickets require http requests(Fresh Data) each time you navigate
* Caching
  * ImprovesResponsiveness
  * Reduces bandwidth and network consumption
  * Reduces Backend server load
  * Reduces redundant computation

### Declarative Caching Pattern

* **shareReplay** operator shares its Input Observables with other subscribers
* shareReplay(1)
  * Replays the defined number of emissions on subscription, in this example the last emission(Since data streams emit once and complete)
* Late subscribers will still get the buffered data even if the Observable completes
* shareReplay is a multicast operator
  * Returns a Subject that shares a single subscription to the underlying source
* **share** operator is similar to shareReplay but by default
  * It doesn't have a buffer
  * Doesn't replay that buffer
* We can set a configuration object
* **shareReplay is a wrapper around the share operator**
```ts
share({
  connector: () => new ReplaySubject(1),
  resetOnComplete: false,
  resetOnError: false,
  resetOnRefCountZero: false
})
```
* The location of shareReplay in the pipeline matters
* The operations after the shareReplay do not get cached and gets re-executed on each emission

### Cache Invalidation

* Evaluate the fluidity of the data
* User stays for a short time and exits the Application, invalidation is not required(cleared when the User exits)
* Things to consider while invalidating:
  * Invalidate the cache on a time interval
  * Do not invalidate when the User is working
    * Allow the User to control when the data is refreshed
  * Always get fresh data on update operations

```ts
private refresh = new BehaviorSubject<void>(undefined);

product$ = refresh.pipe(
  mergeMap(() => this.http.get<Product[]>(this.url).pipe(
    catchError(this.handleError)
  ))
)

// refresh.next(undefined) when user clicks on Refresh or after a Timer
```