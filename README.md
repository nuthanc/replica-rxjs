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