1.What is a Component?
-What is a Component?
2.Types of Components

constracter- when we mount our component js method is going to call first
ngOnInit - one time it will be called
ngOnDestroy - one time will be called

ngOnChanges, ngOnCheck, ngAfterContentChecked, ngAfterViewChecked
every single time when there is a change on the component

ngOnChanges only whrn Input property recives new ref


Directive
-ngFor/ngIf

import pysicaly data 



output
child parent

input
parent to child

The Shadow DOM
some part of the page, has 
its own DOM within it.

directive
add new behaver to our component eg:ngIf

component life cycle

detection chage

whenever an asynchronous operation has been performed, our application state 
will be changed. This is when someone needs to tell Angular to update the view 
(Zones).
All async tasks are Monkey-Patched and they run in the same Zone

@ContentChild('assadContent') mycontent: any;
