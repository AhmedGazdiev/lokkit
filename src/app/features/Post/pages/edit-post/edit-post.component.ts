import {Component, inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-edit-post',
  imports: [],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.scss'
})
export class EditPostComponent {
  private route = inject(ActivatedRoute);
  public editId: string | null = null;

  ngOnInit(): void {
    this.editId = this.route.snapshot.paramMap.get('id');
  }
}
