extends Area2D

signal block_pressed(block: Area2D)
signal block_released(block: Area2D)

@export var unit_val: int = 1

@onready var sprite: Sprite2D = $BlockSprite

var is_dragging: bool = false
var drag_offset: Vector2 = Vector2.ZERO

func _input_event(viewport: Viewport, event: InputEvent, shape_idx: int) -> void:
	if event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT and event.pressed:
		block_pressed.emit(self)

func _input(event: InputEvent) -> void:
	if is_dragging and event is InputEventMouseButton and event.button_index == MOUSE_BUTTON_LEFT and not event.pressed:
		_stop_drag()

func _process(delta: float) -> void:
	if is_dragging:
		global_position = get_global_mouse_position() + drag_offset

func _start_drag_at(pointer_pos: Vector2) -> void:
	is_dragging = true
	drag_offset = global_position - pointer_pos

func _stop_drag() -> void:
	if not is_dragging:
		return
	is_dragging = false
	block_released.emit(self)
