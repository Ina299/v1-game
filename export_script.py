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
        export_textures=True,
        export_normals=True,
        export_tangents=True,
        export_materials='EXPORT',
        export_colors=True,
        export_cameras=True,
        export_lights=True,
        export_animations=True,
        export_frame_range=True,
        export_frame_step=1,
        export_apply=False
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