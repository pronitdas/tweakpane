import {PointerHandler, PointerHandlerEvents} from '../../misc/pointer-handler';
import {PointerData} from '../../misc/pointer-handler';
import {Color} from '../../model/color';
import {InputValue} from '../../model/input-value';
import {ViewModel} from '../../model/view-model';
import {APaletteInputView} from '../../view/input/a-palette';
import {InputController} from './input';

interface Config {
	value: InputValue<Color>;
	viewModel: ViewModel;
}

/**
 * @hidden
 */
export class APaletteInputController implements InputController<Color> {
	public readonly viewModel: ViewModel;
	public readonly value: InputValue<Color>;
	public readonly view: APaletteInputView;
	private ptHandler_: PointerHandler;

	constructor(document: Document, config: Config) {
		this.onPointerDown_ = this.onPointerDown_.bind(this);
		this.onPointerMove_ = this.onPointerMove_.bind(this);
		this.onPointerUp_ = this.onPointerUp_.bind(this);

		this.value = config.value;

		this.viewModel = config.viewModel;
		this.view = new APaletteInputView(document, {
			model: this.viewModel,
			value: this.value,
		});

		this.ptHandler_ = new PointerHandler(document, this.view.canvasElement);
		this.ptHandler_.emitter.on('down', this.onPointerDown_);
		this.ptHandler_.emitter.on('move', this.onPointerMove_);
		this.ptHandler_.emitter.on('up', this.onPointerUp_);
	}

	private handlePointerEvent_(d: PointerData): void {
		const alpha = 1 - d.py;

		const c = this.value.rawValue;
		const [h, s, v] = c.getComponents('hsv');
		this.value.rawValue = new Color([h, s, v, alpha], 'hsv');
		this.view.update();
	}

	private onPointerDown_(ev: PointerHandlerEvents['down']): void {
		this.handlePointerEvent_(ev.data);
	}

	private onPointerMove_(ev: PointerHandlerEvents['move']): void {
		this.handlePointerEvent_(ev.data);
	}

	private onPointerUp_(ev: PointerHandlerEvents['up']): void {
		this.handlePointerEvent_(ev.data);
	}
}