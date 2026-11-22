extends Node2D

const BLOCK_1_SCENE: PackedScene = preload("res://scenes/blocks/block_1_one_unit.tscn")
const BLOCK_10_SCENE: PackedScene = preload("res://scenes/blocks/block_10_ten_unit.tscn")
const BLOCK_100_SCENE: PackedScene = preload("res://scenes/blocks/block_100_hundred_unit.tscn")

enum Mode { PRACTICE, REAL }
enum Tier { TIER_10, TIER_100, TIER_1000 }

var current_mode: Mode = Mode.PRACTICE
var current_tier: Tier = Tier.TIER_10
var target_number: int = 0
var current_total: int = 0
var attempts: int = 0

var _pending_pressed_blocks: Array[Area2D] =[]
var active_dragged_block: Area2D = null

@onready var blocks_container: Node2D = $PlayArea/BlocksContainer
@onready var spawn_point: Marker2D = $PlayArea/Spawnpoint

@onready var mode_button: Button = $UILayer/TopBar/ModeButton
@onready var tier_button: Button = $UILayer/TopBar/TierButton
@onready var target_label: Label = $UILayer/TopBar/TargetLabel
@onready var total_label: Label = $UILayer/TopBar/CurrentTotalLabel

@onready var spawn_1_button: Button = $UILayer/SpawnerBar/Spawn1Button
@onready var spawn_10_button: Button = $UILayer/SpawnerBar/Spawn10Button
@onready var spawn_100_button: Button = $UILayer/SpawnerBar/Spawn100Button

@onready var clear_button: Button = $UILayer/BottomBar/ClearButton
@onready var check_button: Button = $UILayer/BottomBar/CheckButton
@onready var feedback_label: Label = $UILayer/BottomBar/FeedbackLabel

@onready var trash_area: Area2D = $TrashArea
@onready var trash_visual: CanvasItem = $TrashArea/TrashVisual

const TRASH_NORMAL_COLOR := Color(1.0, 0.55, 0.55, 0.4)
const TRASH_HOVER_COLOR := Color(1.0, 0.3, 0.3, 0.8)


func _ready() -> void:
	_apply_tier_rules()
	_start_round()


func _get_max_number() -> int:
	match current_tier:
		Tier.TIER_10:
			return 10
		Tier.TIER_100:
			return 100
		Tier.TIER_1000:
			return 1000
	return 10

func _apply_tier_rules() -> void:
	match current_tier:
		Tier.TIER_10:
			tier_button.text = "Range: 0-10"
			spawn_10_button.visible = false
			spawn_100_button.visible = false
		Tier.TIER_100:
			tier_button.text = "Range: 0-100"
			spawn_10_button.visible = true
			spawn_100_button.visible = false
		Tier.TIER_1000:
			tier_button.text = "Range: 0-1000"
			spawn_10_button.visible = true
			spawn_100_button.visible = true


func _start_round() -> void:
	_clear_blocks()
	attempts = 0
	
	if current_mode == Mode.PRACTICE:
		mode_button.text = "Mode: Practice"
		target_label.text = "Practice: Count the Blocks"
		check_button.visible = false
		feedback_label.text = "Explore Numbers by Adding Blocks!"
	else:
		mode_button.text = "Mode: Game"
		target_number = randi_range(0, _get_max_number())
		target_label.text = "Make: " + str(target_number)
		check_button.visible = true
		feedback_label.text = "Build " + str(target_number) + " using the Blocks!"

func _spawn_block(scene: PackedScene) -> void:
	
	var block := scene.instantiate() as Area2D
	block.global_position = spawn_point.global_position
	
	var offset_step := blocks_container.get_child_count() % 6
	block.global_position += Vector2(offset_step * 24.0, offset_step * 12.0)
	
	if block.has_signal("block_pressed"):
		block.block_pressed.connect(_on_block_pressed)
	if block.has_signal("block_released"):
		block.block_released.connect(_on_block_released)
		
	
	blocks_container.add_child(block)
	_recalculate_total()


func _on_block_pressed(block: Area2D) -> void:
	if active_dragged_block != null:
		return
	
	if _pending_pressed_blocks.is_empty():
		_pending_pressed_blocks.append(block)
		call_deferred("_resolve_top_block_drag")
	else:
		_pending_pressed_blocks.append(block)

func _resolve_top_block_drag() -> void:
	if _pending_pressed_blocks.is_empty():
		return
	
	var top_block: Area2D = _pending_pressed_blocks[0]
	var highest_idx: int = top_block.get_index()
	
	for candidate in _pending_pressed_blocks:
		var idx: int = candidate.get_index()
		if idx > highest_idx:
			highest_idx = idx
			top_block = candidate
	
	_pending_pressed_blocks.clear()
	
	blocks_container.move_child(top_block, blocks_container.get_child_count() - 1)
	active_dragged_block = top_block
	if top_block.has_method("_start_drag_at"):
		top_block._start_drag_at(get_global_mouse_position())

func _on_block_released(block: Area2D) -> void:
	var dropped_on_trash := (block == active_dragged_block) and _is_pointer_over_trash()
	
	if block == active_dragged_block:
		active_dragged_block = null
	
	if dropped_on_trash and is_instance_valid(block):
		block.queue_free()
		await get_tree().process_frame
		_recalculate_total()
	
	
	_recalculate_total()
	_update_trash_highlight()


func _recalculate_total() -> void:
	var total := 0
	for child in blocks_container.get_children():
		if "unit_val" in child:
			total += child.unit_val
	current_total = total
	total_label.text = "Total: " + str(current_total)

func _clear_blocks() -> void:
	for child in blocks_container.get_children():
		child.queue_free()
	current_total = 0
	total_label.text = "Total: 0"


func _process(delta: float) -> void:
	_recalculate_total()
	_update_trash_highlight()

func _update_trash_highlight() -> void:
	if trash_visual == null:
		return
	
	var hovering_trash := active_dragged_block != null and _is_pointer_over_trash()
	
	if hovering_trash:
		trash_visual.modulate = TRASH_HOVER_COLOR
	else:
		trash_visual.modulate = TRASH_NORMAL_COLOR

func _is_pointer_over_trash() -> bool:
	if trash_area == null:
		return false
	
	var shape_node := trash_area.get_node_or_null("TrashCollision") as CollisionShape2D
	if shape_node == null or shape_node.shape == null:
		return false
	
	var local_point: Vector2 = shape_node.to_local(get_global_mouse_position())
	
	if shape_node.shape is RectangleShape2D:
		var rect_shape := shape_node.shape as RectangleShape2D
		var half_size: Vector2 = rect_shape.size * 0.5
		return abs(local_point.x) <= half_size.x and abs(local_point.y) <= half_size.y
	
	if shape_node.shape is CircleShape2D:
		var circle_shape := shape_node.shape as CircleShape2D
		return local_point.length() <= circle_shape.radius
	
	return false


# ----- Button Signals Functions -----

# --- Top Bar Buttons ---

func _on_mode_button_pressed() -> void:
	if current_mode == Mode.PRACTICE:
		current_mode = Mode.REAL
	else:
		current_mode = Mode.PRACTICE
	_start_round()

func _on_tier_button_pressed() -> void:
	match current_tier:
		Tier.TIER_10:
			current_tier = Tier.TIER_100
		Tier.TIER_100:
			current_tier = Tier.TIER_1000
		Tier.TIER_1000:
			current_tier = Tier.TIER_10
	_apply_tier_rules()
	_start_round()


# --- Spawner Bar Buttons ---

func _on_spawn_1_button_pressed() -> void:
	_spawn_block(BLOCK_1_SCENE)

func _on_spawn_10_button_pressed() -> void:
	_spawn_block(BLOCK_10_SCENE)

func _on_spawn_100_button_pressed() -> void:
	_spawn_block(BLOCK_100_SCENE)


# --- Bottom Bar Buttons ---

func _on_clear_button_pressed() -> void:
	_clear_blocks()
	feedback_label.text = "Cleared all blocks."

func _on_check_button_pressed() -> void:
	if current_mode != Mode.REAL:
		return
	
	attempts += 1
	if current_total == target_number:
		feedback_label.text = "Nice work! You built " + str(target_number) + " using the Blocks!"
		await get_tree().create_timer(1.5).timeout
		_start_round()
	elif current_total > target_number:
		feedback_label.text = "Oops! Too high (" + str(current_total) + "). Try clearing or removing some Blocks."
	else:
		feedback_label.text = "Not enough just yet (" + str(current_total) + "). Keep adding more Blocks!"
