import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { mutationChanges } from '../mutation-tests';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass',
})
export class AppComponent implements OnInit {
  title = 'dom-mutation-tests';

  showButton = false;
  divClass = 'to-hover';
  changesFromMutation = new BehaviorSubject<string[]>([]);

  @HostBinding('attr.id')
  componentId = 'mutation-app';

  private lastButtonTimeout: any;

  public ngOnInit(): void {
    mutationChanges.subscribe((change) => {
      this.changesFromMutation.next(
        [...this.changesFromMutation.value, change].slice(-10)
      );
    });
  }

  public onEnterDiv() {
    this.showButton = true;
  }

  public onLeaveDiv() {
    clearTimeout(this.lastButtonTimeout);

    this.lastButtonTimeout = setTimeout(() => {
      this.showButton = false;
    }, 5000);
  }

  public onClickButton() {
    this.divClass =
      this.divClass === 'to-hover' ? 'already-hovered' : 'to-hover';
  }
}
