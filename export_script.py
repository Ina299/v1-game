import bpy
import os

# 出力先ディレクトリ
output_dir = "public/models/"
os.makedirs(output_dir, exist_ok=True)

# 現在のシーンをエクスポート
def export_scene():
    # GLTFエクスポート
    bpy.ops.export_scene.gltf(
        filepath=os.path.join(output_dir, "stage.glb"),
        export_format='GLB',
        use_selection=False,
        # export_textures=True,  # Removed as it's likely deprecated or included in materials
        export_normals=True,
        export_tangents=True,
        export_materials='EXPORT',
        # export_colors=True, # Removed as it might be deprecated or included elsewhere
        export_cameras=True, # Export cameras if needed
        export_lights=True, # Export lights if needed
        export_animations=True, # Export animations if present
        export_frame_range=False, # Typically False unless exporting specific frame animation
        export_frame_step=1,
        export_apply=True # Apply modifiers
    )
    
    print("Model exported successfully to", os.path.join(output_dir, "stage.glb"))

# モデルディレクトリが存在しない場合は作成
if not os.path.exists(output_dir):
    os.makedirs(output_dir)
    print(f"Created directory: {output_dir}")

# エクスポート実行
export_scene()

# Blenderを終了（コマンドラインから実行する場合）
# bpy.ops.wm.quit_blender()